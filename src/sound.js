import EventEmitter from "eventemitter";
import {Howler, Howl} from "howler";

export default class Sound extends EventEmitter {
  constructor({src}) {
    super();
    if(!src) {
      throw new Error("Sound must have src option");
    }
    this.src = src;
  }

  get playing() {
    return this.howl && this.howl.playing();
  }

  load() {
    return new Promise((resolve, reject) => {
      const {src} = this;
      this.howl = new Howl({
        src: [src],
        autoplay: false,
        loop: false,
        onload: resolve,
        onloaderror: reject
      });
    });
  }

  play() {
    const onEnd = () => this.emit("end");
    const onError = (error) => {
      console.error(`Error while playing sound: ${error}`);
      this.emit("end");
    };
    return new Promise((resolve, reject) => {
      const {howl} = this;
      this.emit("start");

      function onEnd() {
        howl.off("stop", onStop);
        resolve();
      }

      function onStop() {
        howl.off("end", onEnd);
        resolve();
      }

      howl.once("end", onEnd);
      howl.once("stop", onStop);
      howl.seek(0);
      howl.play();
    }).then(onEnd, onError);
  }

  stop() {
    const {howl} = this;
    if(howl) {
      howl.stop();
    }
  }

  pause() {
    const {howl} = this;
    if(howl) {
      howl.pause();
    }
  }

  unload() {
    const {howl} = this;
    if(howl) {
      howl.unload();
      this.howl = null;
    }
  }
}
