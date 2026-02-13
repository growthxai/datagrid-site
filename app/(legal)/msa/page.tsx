export const metadata = {
  title: "Master Service Agreement | Datagrid",
  description: "Datagrid Master Service Agreement.",
};

export default function MsaPage() {
  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-2">
          Datagrid Master Service Agreement
        </h1>
        <p className="text-sm text-tertiary mb-12">
          Effective March 26th, 2025
        </p>
        <p className="text-sm text-secondary leading-relaxed mb-12">
          This Agreement sets forth the complete and exclusive terms and
          conditions between Toric Labs, Inc (doing business as
          &ldquo;Datagrid&rdquo;) and Customer regarding Customer&apos;s use of
          the Datagrid platform and related services. By executing an Order Form
          or Statement of Work that references this Agreement, Customer agrees to
          be bound by the terms and conditions set forth herein. This Agreement,
          together with all Order Forms and Statements of Work executed
          hereunder, constitutes the entire agreement between the parties and
          supersedes all prior and contemporaneous agreements, proposals, or
          representations, written or oral, concerning its subject matter.
        </p>

        <div className="space-y-8 text-sm text-secondary leading-relaxed">
          {/* 0. DEFINITIONS */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              0. Definitions
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>&ldquo;Datagrid&rdquo;</strong> means Toric Labs, Inc,
                doing business as Datagrid, a Delaware corporation with its
                principal office in Boston, Massachusetts.
              </li>
              <li>
                <strong>&ldquo;Customer&rdquo;</strong> means the entity
                identified on the applicable Order Form that has agreed to the
                terms and conditions of this Agreement.
              </li>
              <li>
                <strong>&ldquo;Service&rdquo;</strong> means the Datagrid
                cloud-based platform and related software-as-a-service offerings
                made available by Datagrid to Customer under this Agreement, as
                further described in the applicable Order Form or SOW.
              </li>
              <li>
                <strong>&ldquo;Documentation&rdquo;</strong> means the
                user guides, online help, release notes, training materials, and
                other documentation provided or made available by Datagrid to
                Customer regarding the use or operation of the Service.
              </li>
              <li>
                <strong>&ldquo;DGUs&rdquo;</strong> means Datagrid Consumption
                Units, the unit of measurement used to quantify Customer&apos;s
                consumption of the Service, as further described in Section 5.
              </li>
              <li>
                <strong>&ldquo;Order Form&rdquo;</strong> means an ordering
                document executed by both parties that specifies the Service,
                DGU allocation, fees, subscription term, and other
                commercial terms applicable to Customer&apos;s use of the
                Service under this Agreement.
              </li>
              <li>
                <strong>&ldquo;SOW(s)&rdquo;</strong> means any Statement(s) of
                Work executed by both parties that describe professional
                services, implementation tasks, custom development, or other
                specific deliverables to be provided by Datagrid to Customer,
                including the scope, timeline, fees, and acceptance criteria for
                such work.
              </li>
              <li>
                <strong>&ldquo;Warranty Period&rdquo;</strong> means the period
                of thirty (30) days following the initial delivery or activation
                of the Service for Customer, during which the limited warranty
                described in Section 8 applies.
              </li>
            </ul>
          </section>

          {/* 1. LICENSE AND SUPPORT */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              1. License and Support
            </h2>
            <p className="mb-3">
              Subject to the terms and conditions of this Agreement and
              Customer&apos;s payment of all applicable fees, Datagrid hereby
              grants to Customer a non-exclusive, non-transferable,
              non-sublicensable license to access and use the Service during the
              applicable subscription term solely for Customer&apos;s internal
              business purposes and in accordance with the Documentation.
            </p>
            <p className="mb-3">
              Customer&apos;s use of the Service shall be measured in DGUs as
              described in Section 5. Customer&apos;s DGU allocation shall be as
              set forth in the applicable Order Form. Customer shall not exceed
              its allocated DGUs without prior authorization or an applicable
              overage arrangement as described in Section 3.2.
            </p>
            <p>
              Datagrid shall provide Customer with subscription support and
              service level commitments in accordance with the terms set forth in
              Appendix 1 (Subscription Support and Service Level Policy)
              attached hereto and incorporated herein by reference.
            </p>
          </section>

          {/* 2. TERM; RENEWAL; TERMINATION */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              2. Term; Renewal; Termination
            </h2>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              2.1 Term of Agreement
            </h3>
            <p className="mb-3">
              This Agreement shall become effective on the date of the last
              signature on the initial Order Form (the &ldquo;Effective
              Date&rdquo;) and shall remain in effect until all Order Forms and
              SOWs executed hereunder have expired or been terminated, unless
              earlier terminated in accordance with this Section 2.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              2.2 Term and Renewal
            </h3>
            <p className="mb-3">
              Each Order Form shall specify an initial subscription term. Unless
              either party provides written notice of non-renewal at least ninety
              (90) days prior to the end of the then-current term, each Order
              Form shall automatically renew for successive one (1) year renewal
              terms. Upon renewal, Datagrid may increase fees by an amount not to
              exceed the greater of (a) the percentage increase in the Consumer
              Price Index (CPI) for the preceding twelve (12) month period, or
              (b) five percent (5%) of the fees in effect during the
              then-current term.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              2.3 Termination for Material Breach
            </h3>
            <p className="mb-3">
              Either party may terminate this Agreement or any Order Form if the
              other party materially breaches this Agreement and fails to cure
              such breach within thirty (30) days after receipt of written notice
              specifying the breach in reasonable detail. In the event of
              termination by Customer due to Datagrid&apos;s uncured material
              breach, Datagrid shall refund to Customer any prepaid fees
              allocable to the remainder of the subscription term following the
              effective date of termination. In the event of termination by
              Datagrid due to Customer&apos;s uncured material breach, Customer
              shall pay all fees due through the end of the then-current
              subscription term.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              2.4 Plan Upgrade
            </h3>
            <p>
              Customer may upgrade its subscription plan at any time during the
              then-current term by executing a new Order Form. Upon upgrade,
              Customer shall pay the difference between the fees for the upgraded
              plan and the fees already paid for the then-current term, prorated
              for the remainder of the term. The upgraded plan shall take effect
              upon execution of the new Order Form and payment of any applicable
              fees.
            </p>
          </section>

          {/* 3. FEES; PAYMENT TERMS */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              3. Fees; Payment Terms
            </h2>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              3.1 Payment
            </h3>
            <p className="mb-3">
              All fees are as set forth in the applicable Order Form. All payment
              obligations are non-cancelable and all fees paid are
              non-refundable, except as expressly set forth in this Agreement.
              Unless otherwise specified in the Order Form, all invoices are due
              and payable within thirty (30) days of the invoice date. Late
              payments shall bear interest at the lesser of one and one-half
              percent (1.5%) per month or the maximum rate permitted by law. All
              fees are stated in and shall be paid in United States dollars.
              Customer shall be responsible for all taxes, levies, or duties
              imposed by taxing authorities on the fees, excluding taxes based on
              Datagrid&apos;s net income.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              3.2 Overages
            </h3>
            <p className="mb-3">
              If Customer&apos;s usage of the Service exceeds the DGU allocation
              specified in the applicable Order Form, Datagrid shall invoice
              Customer for such excess usage at the overage rate specified in the
              Order Form, or if no overage rate is specified, at Datagrid&apos;s
              then-current list price for additional DGUs. Overage invoices shall
              be issued monthly in arrears and are due and payable within thirty
              (30) days of the invoice date.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              3.3 Suspension
            </h3>
            <p className="mb-3">
              If any amount owed by Customer under this Agreement remains unpaid
              for sixty (60) or more days past the due date, Datagrid may, upon
              fifteen (15) days&apos; prior written notice, suspend
              Customer&apos;s access to the Service until all outstanding amounts
              are paid in full. Suspension shall not relieve Customer of its
              obligation to pay all amounts due under this Agreement, including
              fees accruing during the suspension period.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              3.4 Discretion in Service Continuation
            </h3>
            <p>
              Datagrid reserves the right, in its sole discretion, to continue
              providing the Service to Customer during any period of non-payment
              or dispute without waiving any of its rights under this Agreement,
              including the right to suspend or terminate the Service as
              otherwise provided herein. Datagrid&apos;s election to continue
              providing the Service shall not be construed as a waiver of
              Customer&apos;s payment obligations or any other rights of Datagrid
              under this Agreement.
            </p>
          </section>

          {/* 4. RESTRICTIONS; PROPRIETARY RIGHTS */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              4. Restrictions; Proprietary Rights
            </h2>
            <p className="mb-3">
              Customer shall not, and shall not permit any third party to: (a)
              reverse engineer, decompile, disassemble, or otherwise attempt to
              derive the source code, algorithms, or underlying structure of the
              Service; (b) modify, adapt, translate, or create derivative works
              based on the Service; (c) copy, frame, or mirror any part of the
              Service other than for reasonable backup purposes; (d) use the
              Service to build a competitive product or service, or copy any
              feature, function, or graphic of the Service; (e) sublicense, sell,
              resell, transfer, assign, distribute, or otherwise commercially
              exploit or make available the Service to any third party; or (f)
              interfere with or disrupt the integrity or performance of the
              Service.
            </p>
            <p className="mb-3">
              As between the parties, Datagrid owns and retains all right, title,
              and interest in and to the Service, Documentation, and all related
              intellectual property rights, including all modifications,
              enhancements, and derivative works thereof. No rights are granted
              to Customer other than as expressly set forth in this Agreement.
              Datagrid shall have a royalty-free, worldwide, irrevocable,
              perpetual license to use and incorporate into the Service any
              suggestions, enhancement requests, recommendations, corrections, or
              other feedback provided by Customer relating to the Service.
            </p>
            <p>
              As between the parties, Customer owns and retains all right, title,
              and interest in and to all data, content, and information submitted
              by or on behalf of Customer to the Service (&ldquo;Customer
              Data&rdquo;). Customer grants Datagrid a non-exclusive, worldwide
              license to host, copy, transmit, display, and use Customer Data
              solely as necessary to provide the Service and as otherwise
              permitted by this Agreement.
            </p>
          </section>

          {/* 5. DATAGRID CONSUMPTION UNITS */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              5. Datagrid Consumption Units
            </h2>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              5.1 Overview
            </h3>
            <p className="mb-3">
              The Service is metered and billed based on Datagrid Consumption
              Units (&ldquo;DGUs&rdquo;). DGUs represent a standardized unit of
              measurement that reflects the computational resources, data
              processing, and platform utilization consumed by Customer in
              connection with Customer&apos;s use of the Service. The specific
              activities and resource types that contribute to DGU consumption
              may vary based on Customer&apos;s use case and the features of the
              Service utilized.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              5.2 Purchase and Utilization
            </h3>
            <p className="mb-3">
              Customer shall purchase DGUs as specified in the applicable Order
              Form. DGUs are consumed as Customer uses the Service during the
              subscription term. DGUs purchased under an Order Form are valid
              only during the subscription term specified therein and do not roll
              over to any subsequent term unless expressly agreed in writing.
              Unused DGUs at the end of a subscription term shall expire without
              refund or credit.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              5.3 Reporting
            </h3>
            <p className="mb-3">
              Datagrid shall provide Customer with access to reporting tools or
              dashboards that allow Customer to monitor its DGU consumption in
              reasonable detail. Datagrid shall use commercially reasonable
              efforts to provide accurate and timely consumption data.
              Datagrid&apos;s measurement of Customer&apos;s DGU consumption
              shall be the definitive record for billing purposes.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              5.4 Flexibility and Changes
            </h3>
            <p className="mb-3">
              Datagrid reserves the right to modify the methodology for
              calculating DGU consumption from time to time, provided that any
              such modification shall not materially increase Customer&apos;s
              cost of using the Service at substantially the same level of
              utilization. Datagrid shall provide Customer with at least sixty
              (60) days&apos; prior written notice of any material changes to the
              DGU calculation methodology.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              5.5 No Line-by-Line Detailing
            </h3>
            <p>
              Customer acknowledges that, due to the nature of the Service and
              the complexity of the underlying computational processes, Datagrid
              is not obligated to provide line-by-line or granular transaction-level
              detailing of DGU consumption. Reporting shall be provided at the
              summary or aggregate level as determined by Datagrid in its
              reasonable discretion.
            </p>
          </section>

          {/* 6. PUBLICITY */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              6. Publicity
            </h2>
            <p className="mb-3">
              Neither party shall issue any press release or public announcement
              regarding this Agreement or the relationship between the parties
              without the prior written consent of the other party, except as
              required by law or regulation.
            </p>
            <p className="mb-3">
              Notwithstanding the foregoing, Customer agrees that Datagrid may
              (a) identify Customer as a customer of Datagrid and use
              Customer&apos;s name and logo on Datagrid&apos;s website and in
              Datagrid&apos;s marketing and promotional materials; and (b)
              include Customer in reference lists provided to prospective
              customers, provided that Datagrid shall not disclose any
              Confidential Information of Customer in connection therewith.
            </p>
            <p>
              With Customer&apos;s prior written consent, Datagrid may develop
              and publish case studies or success stories describing
              Customer&apos;s use of the Service. Customer shall have the right
              to review and approve any such case study prior to publication.
            </p>
          </section>

          {/* 7. CONFIDENTIALITY AND SECURITY */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              7. Confidentiality and Security
            </h2>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              7.1 Confidentiality
            </h3>
            <p className="mb-3">
              &ldquo;Confidential Information&rdquo; means any non-public
              information disclosed by one party (the &ldquo;Disclosing
              Party&rdquo;) to the other party (the &ldquo;Receiving
              Party&rdquo;), whether orally or in writing, that is designated as
              confidential or that reasonably should be understood to be
              confidential given the nature of the information and the
              circumstances of disclosure. Confidential Information includes,
              without limitation, business plans, product roadmaps, pricing,
              financial information, customer lists, technical data, trade
              secrets, and Customer Data.
            </p>
            <p className="mb-3">
              The Receiving Party shall (a) hold the Disclosing Party&apos;s
              Confidential Information in strict confidence; (b) not disclose
              Confidential Information to any third party except to its
              employees, contractors, and agents who have a need to know and are
              bound by confidentiality obligations at least as protective as
              those set forth herein; and (c) not use Confidential Information
              for any purpose other than as necessary to exercise its rights or
              perform its obligations under this Agreement. The Receiving Party
              shall protect Confidential Information using the same degree of
              care it uses to protect its own confidential information, but in no
              event less than reasonable care. Confidentiality obligations shall
              survive for a period of three (3) years following termination or
              expiration of this Agreement, except with respect to trade secrets,
              which shall be protected for so long as they remain trade secrets
              under applicable law.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              7.2 Security
            </h3>
            <p className="mb-3">
              Datagrid shall maintain commercially reasonable administrative,
              physical, and technical safeguards designed to protect the
              security, confidentiality, and integrity of Customer Data. Such
              safeguards shall include, without limitation, encryption of
              Customer Data in transit and at rest, access controls, regular
              security assessments, and incident response procedures. Datagrid
              shall promptly notify Customer of any Security Breach (as defined
              below) affecting Customer Data. A &ldquo;Security Breach&rdquo;
              means any unauthorized access to, acquisition of, or disclosure of
              Customer Data.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              7.3 Data Privacy
            </h3>
            <p>
              To the extent that Datagrid processes any personal data on behalf
              of Customer in connection with the Service, such processing shall
              be governed by Datagrid&apos;s Data Processing Addendum
              (&ldquo;DPA&rdquo;), which is incorporated herein by reference.
              The DPA sets forth the parties&apos; obligations with respect to
              data protection and privacy, including compliance with applicable
              data protection laws and regulations. In the event of a conflict
              between this Agreement and the DPA with respect to the processing
              of personal data, the DPA shall control.
            </p>
          </section>

          {/* 8. LIMITED WARRANTY */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              8. Limited Warranty
            </h2>
            <p className="mb-3">
              Datagrid warrants that, during the Warranty Period, the Service
              shall perform materially in conformance with the Documentation. If
              the Service fails to conform to this warranty during the Warranty
              Period, Datagrid shall, at its sole option and expense, either (a)
              repair or replace the non-conforming Service, or (b) refund the
              fees paid by Customer for the non-conforming portion of the
              Service. This warranty shall not apply to the extent that the
              non-conformance results from (i) Customer&apos;s misuse of the
              Service or use not in accordance with the Documentation; (ii)
              modifications to the Service made by anyone other than Datagrid;
              (iii) Customer&apos;s failure to implement updates or patches
              provided by Datagrid; or (iv) any third-party hardware, software,
              or services.
            </p>
            <p>
              EXCEPT AS EXPRESSLY SET FORTH IN THIS SECTION 8, THE SERVICE IS
              PROVIDED &ldquo;AS IS&rdquo; AND DATAGRID MAKES NO WARRANTIES OF
              ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE,
              INCLUDING WITHOUT LIMITATION ANY WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT.
              DATAGRID DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
              ERROR-FREE, OR COMPLETELY SECURE. NO ADVICE OR INFORMATION,
              WHETHER ORAL OR WRITTEN, OBTAINED BY CUSTOMER FROM DATAGRID OR
              THROUGH THE SERVICE SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED
              HEREIN.
            </p>
          </section>

          {/* 9. LIMITATION OF LIABILITY */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              9. Limitation of Liability
            </h2>
            <p className="mb-3">
              IN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER PARTY FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, REVENUE,
              GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR
              RELATED TO THIS AGREEMENT, WHETHER BASED ON WARRANTY, CONTRACT,
              TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL
              THEORY, EVEN IF THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
              SUCH DAMAGES.
            </p>
            <p>
              EXCEPT FOR CUSTOMER&apos;S PAYMENT OBLIGATIONS, EACH
              PARTY&apos;S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS
              AGREEMENT SHALL NOT EXCEED THE TOTAL FEES PAID OR PAYABLE BY
              CUSTOMER TO DATAGRID DURING THE TWELVE (12) MONTH PERIOD
              IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM. THE
              FOREGOING LIMITATIONS SHALL APPLY NOTWITHSTANDING THE FAILURE OF
              ESSENTIAL PURPOSE OF ANY LIMITED REMEDY PROVIDED HEREIN.
            </p>
          </section>

          {/* 10. INDEMNIFICATION */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              10. Indemnification
            </h2>
            <p className="mb-3">
              Datagrid shall defend, indemnify, and hold harmless Customer and
              its officers, directors, employees, and agents from and against any
              third-party claim, action, or proceeding alleging that
              Customer&apos;s use of the Service in accordance with this
              Agreement infringes or misappropriates any United States patent,
              copyright, trademark, or trade secret of such third party
              (&ldquo;Infringement Claim&rdquo;), and shall pay all damages
              finally awarded against Customer (or the amount of any settlement
              Datagrid enters into) with respect to such Infringement Claim.
            </p>
            <p className="mb-3">
              If the Service becomes, or in Datagrid&apos;s reasonable opinion is
              likely to become, the subject of an Infringement Claim, Datagrid
              may, at its sole option and expense: (a) procure for Customer the
              right to continue using the Service; (b) replace or modify the
              Service so that it becomes non-infringing without materially
              diminishing its functionality; or (c) if neither (a) nor (b) is
              commercially practicable, terminate the applicable Order Form and
              refund to Customer any prepaid fees allocable to the remainder of
              the subscription term following the effective date of termination.
            </p>
            <p>
              Datagrid shall have no obligation under this Section 10 to the
              extent the Infringement Claim arises from: (a) Customer&apos;s
              modification of the Service; (b) Customer&apos;s combination of
              the Service with products, services, or technologies not provided
              by Datagrid; (c) Customer&apos;s use of the Service other than in
              accordance with this Agreement and the Documentation; or (d)
              Customer Data.
            </p>
          </section>

          {/* 11. GENERAL */}
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">
              11. General
            </h2>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.1 Entire Agreement
            </h3>
            <p className="mb-3">
              This Agreement, together with all Order Forms, SOWs, and appendices
              attached hereto or incorporated by reference, constitutes the
              entire agreement between the parties with respect to the subject
              matter hereof and supersedes all prior and contemporaneous
              agreements, proposals, and representations, written or oral. In the
              event of a conflict between this Agreement and any Order Form or
              SOW, the terms of the Order Form or SOW shall control, but only
              with respect to the specific subject matter of such Order Form or
              SOW.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.2 Waiver
            </h3>
            <p className="mb-3">
              No failure or delay by either party in exercising any right, power,
              or privilege under this Agreement shall operate as a waiver
              thereof, nor shall any single or partial exercise thereof preclude
              any other or further exercise thereof or the exercise of any other
              right, power, or privilege.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.3 Independent Contractor
            </h3>
            <p className="mb-3">
              The parties are independent contractors. Nothing in this Agreement
              shall be construed as creating a partnership, joint venture, agency,
              or employment relationship between the parties. Neither party has
              any authority to bind the other or to incur any obligation on
              behalf of the other.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.4 Notices
            </h3>
            <p className="mb-3">
              All notices required or permitted under this Agreement shall be in
              writing and shall be deemed given when (a) delivered personally;
              (b) sent by confirmed email; (c) sent by nationally recognized
              overnight courier; or (d) sent by certified or registered mail,
              return receipt requested, postage prepaid, to the address specified
              on the applicable Order Form or to such other address as either
              party may designate by written notice.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.5 Assignment
            </h3>
            <p className="mb-3">
              Neither party may assign or transfer this Agreement, in whole or in
              part, without the prior written consent of the other party, except
              that either party may assign this Agreement without consent in
              connection with a merger, acquisition, reorganization, or sale of
              all or substantially all of its assets. Any attempted assignment in
              violation of this Section shall be null and void. This Agreement
              shall be binding upon and inure to the benefit of the parties and
              their respective successors and permitted assigns.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.6 Compliance with Laws
            </h3>
            <p className="mb-3">
              Each party shall comply with all applicable laws, rules, and
              regulations in connection with its performance under this
              Agreement, including without limitation all applicable export
              control and sanctions laws and regulations.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.7 Force Majeure
            </h3>
            <p className="mb-3">
              Neither party shall be liable for any failure or delay in
              performing its obligations under this Agreement (other than payment
              obligations) to the extent such failure or delay results from
              circumstances beyond the reasonable control of such party,
              including but not limited to acts of God, natural disasters,
              epidemics, pandemics, war, terrorism, riots, embargoes,
              governmental actions, labor disputes, failures of third-party
              telecommunications or power supply, or denial of service attacks.
              The affected party shall use commercially reasonable efforts to
              mitigate the impact of the force majeure event and shall resume
              performance as soon as reasonably practicable.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.8 Governing Law
            </h3>
            <p className="mb-3">
              This Agreement shall be governed by and construed in accordance
              with the laws of the Commonwealth of Massachusetts, without regard
              to its conflict of laws principles. Any legal action or proceeding
              arising out of or related to this Agreement shall be brought
              exclusively in the federal or state courts located in Boston,
              Massachusetts, and each party irrevocably consents to the
              jurisdiction and venue of such courts.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.9 Non-Solicitation
            </h3>
            <p className="mb-3">
              During the term of this Agreement and for a period of twelve (12)
              months following its termination or expiration, neither party shall
              directly or indirectly solicit or hire any employee of the other
              party who was involved in the performance of this Agreement,
              without the prior written consent of the other party. This
              restriction shall not apply to general solicitations of employment
              not specifically directed at the other party&apos;s employees.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              11.10 Amendments; Survival
            </h3>
            <p>
              This Agreement may not be amended or modified except by a written
              instrument executed by both parties. The following sections shall
              survive the termination or expiration of this Agreement: Section 0
              (Definitions), Section 3 (Fees; Payment Terms) with respect to
              accrued payment obligations, Section 4 (Restrictions; Proprietary
              Rights), Section 7 (Confidentiality and Security), Section 8
              (Limited Warranty) with respect to claims arising during the
              Warranty Period, Section 9 (Limitation of Liability), Section 10
              (Indemnification), and this Section 11 (General).
            </p>
          </section>

          {/* APPENDIX 1 */}
          <section className="border-t border-border pt-8">
            <h2 className="text-lg font-medium text-foreground mb-3">
              Appendix 1 &mdash; Subscription Support and Service Level Policy
            </h2>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              Preventive Support
            </h3>
            <p className="mb-3">
              Datagrid shall provide preventive support to Customer during the
              subscription term, which includes proactive monitoring of the
              Service infrastructure, regular maintenance, performance
              optimization, and implementation of security patches and updates.
              Preventive support is designed to minimize service disruptions and
              ensure the ongoing reliability and availability of the Service.
              Datagrid shall use commercially reasonable efforts to schedule
              planned maintenance during off-peak hours and shall provide
              Customer with advance notice of any planned maintenance that may
              affect Service availability.
            </p>

            <h3 className="text-base font-medium text-foreground mb-2 mt-4">
              Error Correction
            </h3>
            <p className="mb-4">
              Customer may report errors, defects, or other issues with the
              Service by contacting Datagrid support at{" "}
              <a
                href="mailto:support@datagrid.com"
                className="text-foreground underline underline-offset-2"
              >
                support@datagrid.com
              </a>
              . Datagrid shall use commercially reasonable efforts to respond to
              and resolve reported issues in accordance with the severity levels
              and target response times set forth below:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-foreground">
                      Severity
                    </th>
                    <th className="text-left py-2 pr-4 font-medium text-foreground">
                      Description
                    </th>
                    <th className="text-left py-2 font-medium text-foreground">
                      Target Response Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      Severity 1 &mdash; Critical
                    </td>
                    <td className="py-2 pr-4">
                      The Service is completely unavailable or a core function is
                      inoperable, resulting in a critical business impact to
                      Customer with no available workaround.
                    </td>
                    <td className="py-2 whitespace-nowrap">4 hours</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      Severity 2 &mdash; Significant
                    </td>
                    <td className="py-2 pr-4">
                      A major feature or function of the Service is significantly
                      impaired, causing a substantial business impact to
                      Customer, but a workaround or partial solution is
                      available.
                    </td>
                    <td className="py-2 whitespace-nowrap">8 hours</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-foreground">
                      Severity 3 &mdash; Other
                    </td>
                    <td className="py-2 pr-4">
                      A minor feature or function of the Service is impaired or a
                      general question or request is submitted, with minimal or
                      no business impact to Customer.
                    </td>
                    <td className="py-2 whitespace-nowrap">48 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              Response times are measured during Datagrid&apos;s standard
              business hours (9:00 AM to 6:00 PM Eastern Time, Monday through
              Friday, excluding United States federal holidays), except for
              Severity 1 issues, which are monitored 24/7. Datagrid shall assign
              appropriate resources to resolve reported issues based on the
              severity classification and shall provide Customer with regular
              status updates until resolution.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
