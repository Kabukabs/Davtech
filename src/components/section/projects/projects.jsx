import { AiOutlineCaretDown, AiOutlineFilter } from 'react-icons/ai';
import { Text } from '../../ui/custom-ui/text';
import { CompletedProjectCard } from './completed-project.card';
import { OngoingProjectCard } from './ongoing-project.card';
import { FutureProjectCard } from './future-project.card';
import { useNavigate } from 'react-router-dom';
import { DropdownLayout } from '../../ui/custom-ui/dropdown-layout';
import { Tag } from './tag';
export const Projects = () => {
  const navigate = useNavigate();
  const navigateWithQuery = (query) => navigate(`/projects?${query}`);
  const ByStatusMenu = [
    {
      title: 'Ongoing',
      action: () => navigateWithQuery('status=ongoing'),
    },
    {
      title: 'Completed',
      action: () => navigateWithQuery('status=completed'),
    },
  ];

  const ByRoleMenu = [
    {
      title: 'Role1',
      action: () => navigateWithQuery('role=1'),
    },
    {
      title: 'Role2',
      action: () => navigateWithQuery('role=2'),
    },
  ];
  return (
    <div className="max-w-[1540px] md:gap-8 gap-4 lg:px-[8rem] xl:px-[14rem] md:px-[4rem] md:pb-[4rem] p-4 font-medium">
      <div className="flex items-end justify-between flex-wrap">
        <div className="w-full">
          <Text as="h1" style="text-4xl font-extrabold">
            PROJECTS
          </Text>
          <div className="flex flex-wrap justify-between items-center w-full mb-8">
            <Text as="h4" style="md:text-lg font-semibold text-sm">
              Dive into Our Ongoing innovations
            </Text>
            <div className="flex gap-4 flex-wrap items-center">
              <DropdownLayout
                menu={ByStatusMenu}
                trigger={
                  <div className="flex gap-2 items-center">
                    By Status <AiOutlineCaretDown size="1rem" />{' '}
                  </div>
                }
              />
              <DropdownLayout
                menu={ByRoleMenu}
                trigger={
                  <div className="flex gap-2 items-center">
                    By Role <AiOutlineCaretDown size="1rem" />
                  </div>
                }
              />
              <AiOutlineFilter size="1rem" />
            </div>
          </div>
        </div>
      </div>
      <div>
        {/*Completed projects**/}
        <div>
          <CompletedProjectCard
            title={'DAVTECHINVEST PROJECT'}
            info={
              'we harness the power of cutting-edge technology to transform the way businesses understand and engage with their customers. Our team of experts specializes in software development, data collection, analysis, and observing business patterns to create actionable insights for investors'
            }
            contributors={'71'}
            start_date={'4th July, 2023'}
            end_date={'11 June, 2024'}
            img={'/project_img1.svg'}
          />
          <Tag title="Completed project" align={'right'} />
        </div>
        <div className="grid gap-12 md:grid-cols-2 grid-cols-1">
          {/*Ongoing projects**/}
          <div>
            <Tag title="Ongoing project" />
            <OngoingProjectCard
              title={'KABUKABZ PROJECT'}
              info={
                'It is a transport projrct that deals with the real-time of drivers and passengers in a particular region. It calculates the number of passengers for a driver in a bus-stop and tells the passenger  that there is an upcoming vehicle ahead or behind them.'
              }
              contributors={'10'}
              start_date={'10th Octoober, 2024'}
              in_progress={'Ongoing'}
              img={'/project_img1.svg'}
            />
          </div>
          {/*Future projects**/}
          <div>
            <Tag title="Future project" />
            <FutureProjectCard
              project_name={'agricultural project'}
              start_date={'4th februuary 2025'}
              img={'/project_img1.svg'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
