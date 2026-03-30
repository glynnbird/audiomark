// see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

class visualiser {
  constructor() {
    this.canvas = null;
    this.canvasCtx = null;
    this.audioCtx = null;
    this.analyser = null;
    this.clonedSource = null;
    this.source = null;
    this.visualising = false;
  }

  // start visualising
  start(canvas, src) {
    this.canvas = canvas;
    this.canvasCtx = this.canvas.getContext("2d");
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.clonedSource = src.clone();
    this.source = this.audioCtx.createMediaStreamSource(this.clonedSource);
    this.source.connect(this.analyser);
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 1;

    // the visualiser
    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;
    const bufferLengthAlt = this.analyser.frequencyBinCount;
    const dataArrayAlt = new Uint8Array(bufferLengthAlt);
    this.visualising = true;
    const self = this;

    // repeat this function over and over until visualising===false
    var draw = function () {
      self.analyser.getByteTimeDomainData(dataArrayAlt);

      self.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
      var barHeight;
      var x = 0;

      for (var i = 0; i < bufferLengthAlt; i++) {

        // convert number to be between 0 and 1
        const prop = (dataArrayAlt[i] / 128) - 1

        // colour the bar based on the number
        if (prop > 0.9) {
          // red
          self.canvasCtx.fillStyle = "rgb(255, 0, 0)";
        } else if (prop > 0.8) {
          // yellow
          self.canvasCtx.fillStyle = "rgb(255, 255, 0)";
        } else {
          // green
          self.canvasCtx.fillStyle = "rgb(0, 255, 0)";
        }

        // convert 0-->1  to 0 --> height of the canvas
        barHeight = prop * HEIGHT

        // paint a rectangle (y axis goes down the page)
        self.canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, HEIGHT);
        x += barWidth + 1;
      }

      // retrigger draw if we are still visualising
      if (self.visualising) {
        requestAnimationFrame(draw);
      }
    };
    draw();
  }

  stop() {
    this.visualising = false;
    if (this.clonedSource) {
      this.clonedSource.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  }
}

export default visualiser
