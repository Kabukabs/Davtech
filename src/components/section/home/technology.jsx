import { Link } from 'react-router-dom';
import { Text } from '../../ui/custom-ui/text';
export const Technology = () => {
  return (
    <div className="max-w-[1540px] md:gap-8 gap-4 lg:px-[8rem] xl:px-[14rem] md:px-[4rem] md:py-[5rem] p-4 py-[3rem]">
      <div className="gap-12 grid md:grid-cols-2 grid-cols-1">
        <div>
          <Text as="h2" style="text-4xl font-extrabold mb-8 text-blue">
            Technology
          </Text>
          <Text as="h4" style="md:text-lg text-md mb-8">
            Our expertise lies at the intersection of traditional web
            technologies (Web2) and the burgeoning field of blockchain and
            distributed ledger technologies (Web3). We leverage these platforms
            to offer innovative solutions that drive efficiency, transparency,
            and growth.
          </Text>
          <div className="md:text-lg text-sm font-semibold gap-2">
            Join us in revolutionizing the investment landscape with data-driven
            insights.
            <Link to="/contact us" className="text-blue text-none mx-2">
              Contact us
            </Link>{' '}
            today to explore how DavTechInvest can elevate your investment
            strategy.
          </div>
        </div>
        <div>
          <div className="w-full ">
            <img
              src="/technology.jpg"
              alt="object not found"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
