import HomeLanding from "@/components/home-landing/HomeLanding";
import { JsonLd } from "@/components/JsonLd";
import { homePageSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageSchema()} />
      <HomeLanding />
    </>
  );
}
