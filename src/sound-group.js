import Sound from "sound";
import EventEmitter from "eventemitter";
import {Howl} from "howler";

export default class SoundGroup extends EventEmitter {
  constructor(manifest) {
    super();
    this.manifest = manifest;
    this.sounds = Object.entries(manifest).reduce((sounds, [id, src]) => {
      const sound = new Howl({
        src: [src],
        preload: false
      });
      sounds[id] = sound;
    }, {});
  },

  getSound(id) {
    if(id in this.sounds) {
      return this.sounds[id];
    } else {
      throw new Error(`No sound exists with the id ${id}`);
    }
  }

  load() {
    const {sounds} = this;
    Promise.all(Object.values(sounds).map((sound) =>
      loadHowl(sound).catch((error) => console.log(`Failed to load sound ${sound}`))
    ));
    this.emit("load");
  },

  unload() {
    Object.values(this.sounds).forEach((sound) => sound.unload());
    this.emit("unload");
  }

  play(id) {
    return playHowl(this.getSound(id));
  }
}


function loadHowl(howl) {
  return new Promise((resolve, reject) => {
    howl.once("load", onLoad);
    howl.once("loaderror", onLoadError);
    howl.load();

    function onLoad() {
      howl.off("loaderror", onLoadError);
      resolve();
    }
    function onLoadError(error) {
      howl.off("load", onLoad);
      reject(error);
    }
  });
}

function playHowl(howl) {
  return new Promise((resolve, reject) => {
    howl.once("stop", onStop);
    howl.once("pause", onPause);
    howl.once("end", onEnd);
    howl.seek(0);
    howl.play();

    function onStop() {
      howl.off("pause", onPause);
      howl.off("end", onEnd);
      resolve();
    }

    function onPause() {
      howl.off("stop", onStop);
      howl.off("end", onEnd);
      resolve();
    }

    function onEnd() {
      howl.off("stop", onStop);
      howl.off("pause", onPause);
      resolve();
    }
  });
}
