import json
import torch
from helper import get_model, get_tensor

model = get_model()
classes = ['normal','pneumonia','COVID-19']

def get_result(image_path):
    tensor = get_tensor(image_path)
    tensor = tensor.view(-1, 3, 224, 224)
    outputs = model(tensor)
    predicted = torch.max(outputs, 1)[1]
    # prval = torch.max(outputs, 1)[0]
    result = classes[predicted]
    return  result