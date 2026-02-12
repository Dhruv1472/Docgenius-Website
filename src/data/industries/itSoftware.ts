import type { Industry } from "./types";

// import ItSoftware1 from "@/assets/It Software/ItSoftware1.png";
// import ItSoftware2 from "@/assets/It Software/ItSoftware2.png";
// import ItSoftware3 from "@/assets/It Software/ItSoftware3.png";
// import ItSoftware4 from "@/assets/It Software/ItSoftware4.png";
// import ItSoftware5 from "@/assets/It Software/ItSoftware5.png";
// import ItSoftware6 from "@/assets/It Software/ItSoftware6.png";

import ItSoftware1 from "@/assets/Real Estate/Real1.png";
import ItSoftware2 from "@/assets/Real Estate/Real1.png";
import ItSoftware3 from "@/assets/Real Estate/Real1.png";
import ItSoftware4 from "@/assets/Real Estate/Real1.png";
import ItSoftware5 from "@/assets/Real Estate/Real1.png";
import ItSoftware6 from "@/assets/Real Estate/Real1.png";

export const itSoftwareImages: Record<string, string> = {
  itSoftware1: ItSoftware1,
  itSoftware2: ItSoftware2,
  itSoftware3: ItSoftware3,
  itSoftware4: ItSoftware4,
  itSoftware5: ItSoftware5,
  itSoftware6: ItSoftware6,
};

export const itSoftware: Industry = {
  iconKey: "Code",
  name: "IT & Software (SaaS)",
  description: "Industry specializing in software development and IT solutions.",
  useCases: [],
};
