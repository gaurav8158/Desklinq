import React from 'react'
import PropTypes from 'prop-types'

export default function Card({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto py-6 md:px-14 px-4 ">
          <div className="flex gap-20">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-lg">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-4xl text-blueGray-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  'text-white md:p-10 p-6 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-blueGray-400 mt-4">
            <span className={statPercentColor + ' mr-2'}>
              <i
                className={
                  statArrow === 'up'
                    ? 'las la-arrow-up'
                    : statArrow === 'down'
                      ? 'las la-arrow-down'
                      : ''
                }
              ></i>{' '}
              {statPercent}%
            </span>
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  )
}

Card.defaultProps = {
  statSubtitle: 'Traffic',
  statTitle: '350,897',
  statArrow: 'up',
  statPercent: '3.48',
  statPercentColor: 'text-emerald-500',
  statDescripiron: 'Since last month',
  statIconName: 'far fa-chart-bar',
  statIconColor: 'bg-red-500',
}

Card.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(['up', 'down']),
  statPercent: PropTypes.string,
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  statIconColor: PropTypes.string,
}
