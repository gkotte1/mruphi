import Link from "next/link";
import { Icon } from "@/components/icons";

/**
 * The closing CTA panel, built to the spec in
 * murphi-project-assets/graphics/patterns.md §3 - 40px radius (24px ≤600),
 * the documented three-stop blue, the wide blue-tinted shadow, and a 64px mesh
 * masked *inward* so the texture only shows at the edges and the centre stays
 * clean. The healthcare marks live in that same outer band.
 *
 * Contained and inset rather than full-bleed: the radius does the separating,
 * so the white section above it never meets a hard edge.
 */
export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 max-1024:py-20 max-600:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
        <div
          className="relative overflow-hidden rounded-cta px-16 py-[84px] text-center shadow-[0_44px_90px_-42px_rgba(0,86,173,0.62)] max-1024:px-10 max-1024:py-16 max-600:rounded-[24px] max-600:px-6 max-600:py-14"
          style={{
            background: "#007EFF",
          }}
        >
          <PanelLight />

          <div className="relative mx-auto max-w-[720px]">
            <h2 className="type-display text-grey-bg">
              Customize Murphi to suit your requirements
            </h2>

            <p className="mx-auto mt-5 max-w-[480px] text-[17px] font-medium leading-relaxed text-white/80 max-600:text-[15.5px]">
              A live demo tailored to your workflows and your team.
            </p>

            <Link
              href="/contact-us/"
              className="group mt-10 btn-on-blue max-600:mt-8 max-600:w-full max-600:justify-center"
            >
              Request Demo
              <Icon
                name="arrow"
                width={17}
                height={17}
                className="transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Depth without glare: a soft centre illumination, a deeper corner, and the
 * documented 64px mesh at 5%, masked inward.
 */
function PanelLight() {
  return null;
}

