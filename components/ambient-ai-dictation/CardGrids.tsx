import { Icon, type IconName } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { AaEyebrow, AaHead, AaWrap } from "@/components/ambient-ai-dictation/Shell";

type Card = { title: string; body: string; icon: IconName };

const CAPABILITIES: Card[] = [
  {
    title: "Multi-Language Conversations",
    icon: "community",
    body: "Capture and document visits conducted in the patient's preferred language, so nothing gets lost in translation.",
  },
  {
    title: "EHR Syncing",
    icon: "sync",
    body: "Referral attachments, schedules and record data sync in - the completed note writes back to the same chart.",
  },
  {
    title: "Referral Summaries",
    icon: "doc",
    body: "A packet that used to take an evening to read becomes a short summary, prefilled into the chart before the first visit.",
  },
  {
    title: "Medications",
    icon: "scan",
    body: "Add or update medications by voice or by photographing the label - instead of typing each one into the EHR by hand.",
  },
  {
    title: "Wound Care",
    icon: "heart",
    body: "Photograph a wound and describe it by voice; the description and image attach to the chart together.",
  },
  {
    title: "M1800 & GG Items",
    icon: "chartup",
    body: "Functional status items that affect reimbursement are answered from what's actually said and observed during the visit.",
  },
];

const BUILT_FOR: Card[] = [
  {
    title: "Multi-Speaker Aware",
    icon: "mic",
    body: "Follows a visit with more than one voice in the room - patient, caregiver, clinician - and attributes what was said to the right person.",
  },
  {
    title: "Built for Home Health & Hospice",
    icon: "home",
    body: "Trained on the specific structure of Home Health and Hospice documentation, not adapted from a general medical scribe.",
  },
  {
    title: "Near Real-Time EHR Sync",
    icon: "sync",
    body: "Notes move to your EHR without changing how your team already works inside it.",
  },
];

export function Capabilities() {
  return (
    <section className="aa-section">
      <AaWrap>
        <AaHead>
          <AaEyebrow>Built for the Details That Affect Reimbursement</AaEyebrow>
          <h2 className="aa-h2 aa-serif" style={{ marginTop: 16, marginBottom: 18 }}>
            A Comprehensive Suite of Capabilities
          </h2>
        </AaHead>

        <Reveal>
          <ul
            className="aa-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 56,
              borderTop: "1px solid #E3E3E3",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {CAPABILITIES.map((item) => (
              <li
                key={item.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  borderBottom: "1px solid #E3E3E3",
                  padding: "22px 0",
                }}
              >
                <span
                  style={{
                    marginTop: 1,
                    display: "flex",
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    border: "1px solid #E3E3E3",
                    background: "#F5F5F5",
                    color: "#007EFF",
                  }}
                >
                  <Icon name={item.icon} width={17} height={17} />
                </span>

                <div style={{ minWidth: 0 }}>
                  <h4
                    className="aa-serif"
                    style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3 }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "#606060",
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </AaWrap>
    </section>
  );
}

export function BuiltFor() {
  return (
    <section className="aa-section aa-band">
      <AaWrap>
        <AaHead>
          <AaEyebrow>Proprietary AI Infrastructure</AaEyebrow>
          <h2 className="aa-h2 aa-serif" style={{ marginTop: 16, marginBottom: 18 }}>
            Built Specifically for Post-Acute Documentation
          </h2>
        </AaHead>

        <Reveal>
          <div className="aa-ruled aa-grid-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {BUILT_FOR.map((item) => (
              <div key={item.title} style={{ padding: "36px 24px" }}>
                <span
                  style={{
                    display: "flex",
                    width: 36,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    border: "1px solid #E3E3E3",
                    background: "#F5F5F5",
                    color: "#007EFF",
                  }}
                >
                  <Icon name={item.icon} width={17} height={17} />
                </span>

                <h4
                  className="aa-serif"
                  style={{
                    margin: "16px 0 12px",
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#606060" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </AaWrap>
    </section>
  );
}
