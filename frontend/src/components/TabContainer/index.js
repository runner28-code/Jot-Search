import PropTypes from 'prop-types';

export default function TabContainer({ tabChoices, activeTab, setActiveTab, isLocked, absolute = true }) {

  return (
    <div className={`${absoluteStyles} w-fit flex gap-s vw-768:gap-xxl-2 justify-around bg-[#e7f0f8] border border-royalBlue border-solid rounded-full py-5 px-8 `}>
      { tabChoices.map(choice => {
        return <TabButton
          key={choice}
          choice={choice}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLocked={isLocked}
        />
      })}
    </div>
  )
