import { Text } from '../../ui/custom-ui/text';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TableCell, TableRow } from '@/components/ui/table';
import { TableLayout } from '../../ui/custom-ui/table-layout';

export const LearnMore = ({
  title,
  social_links,
  profile,
  vision_mission,
  developement_roadmap,
  contributors,
  compensation,
  default_compensation,
}) => {
  return (
    <div>
      <Text
        as="h6"
        style=" text-center text-black lg:text-4xl font-extrabold md:text-2xl text-xl mb-4"
      >
        {`${title.toUpperCase()} PROJECT OVERVIEW`}
      </Text>

      {/*Company PROFILE */}

      <div className="mb-4">
        <Text as="h6" style="text-black lg:text-lg md:text-md text-md">
          COMPANY PROFILE:
        </Text>
        <Text as="h6" style="text-black md:text-sm text-xs">
          {profile}
        </Text>
      </div>

      {/*Company VISION AND MISSION*/}

      <div>
        <Text as="h6" style="text-black lg:text-lg md:text-md text-sm">
          VISION AND MISSION :
        </Text>
        <ul className="list-disc md:text-sm text-xs">
          {vision_mission.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
        <div>
          <Text
            as="h6"
            style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12"
          >
            DEVELOPMENT ROADMAP
          </Text>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
            {developement_roadmap.map((info, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-[7rem]">
                  <img
                    src={info.img}
                    alt="object not found"
                    className="w-full"
                  />
                </div>
                <div>
                  <Text
                    as="h4"
                    style="text-center text-black md:text-sm text-xl"
                  >
                    {info?.title?.toUpperCase()}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*Company CONTRIBUTORS*/}

        <div>
          <Text
            as="h6"
            style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12"
          >
            CONTRIBUTORS
          </Text>
          <TableLayout
            tableHeadRow={['NAMES', 'ROLES', 'TASKS AND CONTRIBUTIONS']}
          >
            {contributors?.map((info, index) => {
              const { name, role, tasks } = info;
              return (
                <TableRow key={index} className="text-black">
                  {[name, role].map((info, index) => (
                    <TableCell className="font-medium" key={index}>
                      {info}
                    </TableCell>
                  ))}
                  <TableCell className="font-medium" key={index}>
                    <ul className="list-disc">
                      {tasks.map((details, index) => (
                        <li key={index}>{details}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableLayout>
        </div>

        {/*Company COMPENSATION*/}

        <div>
          <Text
            as="h6"
            style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12"
          >
            COMPENSATION
          </Text>
          <RadioGroup
            defaultValue={default_compensation}
            className="grid grid-cols-3 rounded"
          >
            {compensation.map((compensation, index) => {
              const { desc, title } = compensation;
              return (
                <div className="flex flex-col gap-4 p-4" key={index}>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="r1">{title}</Label>
                    <RadioGroupItem value={title} id="r1" />
                  </div>
                  <Text style="text-sm" as="h6">
                    {desc}
                  </Text>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/*Social Links*/}

        <div className="mt-[5rem]">
          <Text as="h6" style=" text-center text-black text- mb-4">
            Connect wih us
          </Text>
          <div className="flex justify-center gap-4 m-auto justify-center">
            {social_links.map((footer_link, index) => {
              const { link, img } = footer_link;
              return (
                <a href={link} key={index} className="w-[2rem] cursor-pointer">
                  <img src={img} alt="object not found" className="w-full" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
