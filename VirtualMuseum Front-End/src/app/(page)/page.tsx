import dynamic from "next/dynamic";

import Hero from "../../components/Hero/Hero";

const Smart_Museum = dynamic(() => import("../../components/Smart Dashboard/Smart_Museum"));
const PharaohLegacy = dynamic(() => import("../../components/PharaohLegacy/PharaohLegacy"));
const FeaturedArtifacts = dynamic(() => import("../../components/FeaturedArtifacts/FeaturedArtifacts"));
const ServicesCTA = dynamic(() => import("../../components/ServicesCTA/ServicesCTA"));
const VirtualCurator = dynamic(() => import("../../components/VirtualCurator/VirtualCurator"));

export default function Home() {
  return (
    <>
      <Hero />
      <Smart_Museum />
      <PharaohLegacy />
      <FeaturedArtifacts />
      <ServicesCTA />
      <VirtualCurator />
    </>
  );
}
