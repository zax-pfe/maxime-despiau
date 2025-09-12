import Gallery from "@/components/Gallery/Gallery";
import { eventImages } from "@/data/eventImages";

export default function Index() {
  return (
    <div>
      <div>
        <Gallery images={eventImages} />
      </div>
    </div>
  );
}
