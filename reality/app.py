from flask import Flask, request, jsonify
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    
    with open(file_path, 'rb') as f:
        file_content = f.read().decode("utf-8")

    return file_content

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query_text = data['query']
    
    # Here you would process the query and return the results
    # For demonstration, we are just echoing the query back
    result = f"Result for query: {query_text}"
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
