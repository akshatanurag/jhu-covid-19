from flask import Flask, request, render_template, send_from_directory, send_file, jsonify
from inference import get_result
import os
app = Flask(__name__)
classes = ['normal','pneumonia','COVID-19']

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'POST':
        # print(request.files)
        # if 'img_file' not in request.files:
        #     print('file not uploaded')
        #     return
        fp = request.get_json()
        img_path = fp['path']
        result = get_result(img_path)
        if(result in classes):
            return jsonify({'prediction':result})

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=4000)
