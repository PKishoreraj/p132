function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    clasifieer= ml5.imageClassifier('MobileNet',modelLoaded);
  }
  function modelLoaded(){
    console.log('Model Loaded!')
  }
  function draw(){
    image(video,0,0,300,300);
    clasifieer.clasify(video,gotResult); 
  }
  var previous_result='';
  function gotResult(){
    if(error){
      console.log(error)
    }
    else{
      if((result[0].confidence>0.5)&&(previous_result[0].label)){
      console.log(results);
      previous_result=result[0].label;
      var synth=window.speechSynthesis;
      speak_data='Object deteted is -'+result[0].label;
      synth.speak(utterThis);
      document.getElementById("result_object_name").innerHTML=results[0].label;
      document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
      }
    }
  }