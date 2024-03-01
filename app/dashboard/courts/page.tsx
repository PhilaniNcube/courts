import CourtsList from "@/app/(courts)/courts-list";
import { getCourts } from "@/lib/fetchers/courts-fetcher";

const CourtsPage =async  () => {

  const {courts, error} = await getCourts();

  return <div>
    <h1>Courts</h1>
    <div>
      {courts ?
      <CourtsList courts={courts} /> : null
     }
    </div>
  </div>;
};
export default CourtsPage;
