import { TrailMaking } from "./TrailMaking";
import { CubeMaking } from "./CubeMaking";
import { AudioText } from "./AudioText";
import { WordRecall } from "./WordRecall";

// sections
// drawing

const Tests = [
  {
    name: "trailmaking",
    component: TrailMaking,
  },
  {
    name: "cubemaking",
    component: CubeMaking,
  },
  {
    name: "audiotext",
    component: AudioText,
  },
  {
    name: "wordrecall",
    component: WordRecall,
  },

];

export const ShowCognitiveTests = () => {

    return (
       <AudioText/>
    )

};
