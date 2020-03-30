import io
import torch
import torch.nn as nn
import numpy as np
from PIL import Image
from torchvision import models,transforms

def get_model():
    checkpoint_path = 'model_train_loss.pt'
    model = models.mobilenet_v2(pretrained = False)
    model.classifier = nn.Sequential(
        nn.Linear(1280,3),
    )
    # model.load_state_dict(torch.load(checkpoint_path, map_location='cpu'))
    model.eval()
    return model

def get_tensor(image_path):
    t_trans = transforms.Compose([
        transforms.Resize((224,224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5],std=[0.5])
    ])

    img = Image.open(image_path)
    img = img.convert('RGB')
     
    #print(img.shape)
    return t_trans(img)
