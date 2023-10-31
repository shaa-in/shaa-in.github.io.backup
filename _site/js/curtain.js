function resizeCanvasToDisplaySize(force) {
  const canvas = renderer.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (force || canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }
}


function renderCurtain() {
  // set up our WebGL context and append the canvas to our wrapper
  var webGLCurtain = new Curtains({
    container: "canvas"
  });
  
  // if there's any error during init, we're going to catch it here
  webGLCurtain.onError(function() {
    // we will add a class to the document body to display original images
    document.body.classList.add("no-curtains");
  });

  // get our plane element
  var planeElement = document.getElementsByClassName("plane")[0];

  // set our initial parameters (basic uniforms)
  var params = {
    vertexShaderID: "plane-vs", // our vertex shader ID
    fragmentShaderID: "plane-fs", // our framgent shader ID
    //crossOrigin: "", // codepen specific
    uniforms: {
      time: {
        name: "uTime", // uniform name that will be passed to our shaders
        type: "1f", // this means our uniform is a float
        value: 0,
      },
    }
  }

  // create our plane mesh
  var plane = webGLCurtain.addPlane(planeElement, params);

  // if our plane has been successfully created
  // we use the onRender method of our plane fired at each requestAnimationFrame call
  plane && plane.onRender(function() {
    plane.uniforms.time.value++; // update our time uniform value
  });

}

window.onload = function() {
  renderCurtain()
  // resizeCanvasToDisplaySize(true)
}
