from flask import Flask, request, jsonify
import google.generativeai as genai
from googletrans import Translator
from PIL import Image
from flask_cors import CORS
from dotenv import load_dotenv
import os
import io
load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(model_name="gemini-2.5-pro")

translator = Translator()

@app.route('/caption', methods=['POST'])
def caption_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files['image']
    
    prompt_instruction = "Generate a clear and concise caption that accurately describes the contents of this image. The caption should be a single sentence. Respond only with the caption text."

    try:
        image = Image.open(io.BytesIO(image_file.read()))

        response = model.generate_content([
            prompt_instruction,
            image
        ])
        
        caption_en = response.text.strip()
        if caption_en.startswith('"') and caption_en.endswith('"'):
            caption_en = caption_en[1:-1]
        
        caption_ar = translator.translate(caption_en, dest='ar').text

        return jsonify({
            "captionText": caption_en,
            "captionArabic": caption_ar
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
