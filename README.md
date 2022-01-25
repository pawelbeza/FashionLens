<p align="middle">
<img src="https://user-images.githubusercontent.com/43823276/151002399-50b1005d-da8f-41c6-a7e9-2df561db009e.png">
</p>

# FashionLens  
Fashion Lens is an android app 📱 which detects clothes 👕 on given image/video and enables finding 🔍 visually similar clothes to the found ones. 

<p align="middle">
<img src="https://user-images.githubusercontent.com/43823276/151003108-f8a79ad5-0f95-4a31-9d80-3efe194d44a7.png">
</p>

# Build 🔨 and run 🚘
1. App depends on external microservice which is responsible for detecting clothes on given image hence it is required to do one of the following things:
- Pull docker image 🐳 from dockerhub repo by executing `docker pull pbeza/clothes-detector`
- Build docker image 🐳 on your own by following [these instructions](https://github.com/pawelbeza/ClothesDetector)
2. Run docker container locally with `docker run pbe/clothes-detector:latest` or deploy it to the cloud ☁️
3. In the root directory of cloned project create `.env` file with:
- `API_URL` - url to your microservice concatenated with "/detect" string
- `API_KEY` - token used when using Bearer Authentication 🔑 (it's not required if your API is publically accessible f.e. if running locally).  

You can find examplary `.env` file below:  
```
API_URL=http://192.168.1.55:8080/detect  
API_KEY=key
```
4. Install app dependencies with `npm install`
5. Run app 📱 on physical device or on emulator with Android with `react-native run-android --variant=release`
