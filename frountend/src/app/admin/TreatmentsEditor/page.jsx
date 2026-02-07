
import TreatmentsEditor from "@/components/Admin/components/TreatmentsEditor";
import treatments from "@/data/BeforAndAfter";


export default function Page() {
    return <TreatmentsEditor initialData={treatments} />;
}
