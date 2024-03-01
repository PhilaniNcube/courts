import { getCourts } from "@/lib/fetchers/courts-fetcher";

const CourtsPage =async  () => {

  const {courts, error} = await getCourts();

  return <div>
    <h1>Courts</h1>
    <span>{courts &&
    <pre>{JSON.stringify(courts, null, 2)}</pre>
    }</span>
  </div>;
};
export default CourtsPage;
