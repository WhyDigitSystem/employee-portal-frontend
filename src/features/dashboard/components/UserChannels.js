import { Link } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";

const userSourceData = [
  { source: "New Year", Date: "01/01/2024", Day: 10.2 },
  { source: "Pongal", Date: "15/01/2024", Day: 11.7 },
  { source: "Mattu Pongal", Date: "16/01/2024", Day: 12.4 },
  { source: "Republic Day", Date: "26/01/2024", Day: 20.9 },
  { source: "Labour Day", Date: "01/05/2024", Day: 10.3 },
];

function UserChannels() {
  return (
    <TitleCard title={"Goverment Holidays"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Holiday</th>
              <th className="normal-case">Date</th>
              <th className="normal-case">Day</th>
            </tr>
          </thead>
          <tbody>
            {userSourceData.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.source}</td>
                  <td>{u.Date}</td>
                  <td>{`${u.Day}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p
          className="text-end"
          sx={{
            color: "green",
          }}
        >
          <Link to="/app/holidayreport">More...</Link>
        </p>
      </div>
    </TitleCard>
  );
}

export default UserChannels;
