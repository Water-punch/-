import styled from "styled-components";

import DatePicker, { registerLocale } from "react-datepicker"; // DatePicker 컴포넌트 가져오기
import { addMonths } from "date-fns"; // DatePicker에 부가적인 기능 가져오고 싶을 때 해당 함수들 date-fns에서 import 해오기

import ko from "date-fns/locale/ko"; // 한국어로
registerLocale("ko", ko); // 한국어로
const  _= require("lodash"); // _.range를 표현하기 위하여 사용
// 출처: https://blog.naver.com/PostList.naver?blogId=marsdo

import ArrowLeftSvg from "public/img/common/arrow-left.svg";
import ArrowRightSvg from "public/img/common/arrow-right.svg";

const CalendarPop = (props) => {
  const { startDate, setStartDate, endDate, setEndDate, nextDay, info, type } =
    props;

  const months = [
    // 월 표시
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  if (type === "input_calendar") {
    return (
      <InputDateStyle>
        <div className="calendar_wrap_1">
          <form autoComplete="off">
            <DatePicker
              className={`startDate ${startDate ? "active" : undefined}`}
              id="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              // 구분선
              minDate={new Date()}
              maxDate={addMonths(new Date(), 100)}
              showDisabledMonthNavigation
              // 구분선
              locale="ko"
              showPoperArrow={false}
              fixedHeight
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nexMonthButtonDisabled,
              }) => (
                <div className="date-customheader">
                  <ArrowLeftSvg
                    onClick={decreaseMonth}
                    width={20}
                    height={20}
                    style={
                      prevMonthButtonDisabled
                        ? { visibility: "hidden" }
                        : { display: "block" }
                    }
                  />
                  <div className="custom-month">
                    <span className="month">{months[date.getMonth()]}월,</span>
                    <span className="year"> {date.getFullYear()}</span>
                  </div>
                  <ArrowRightSvg
                    onClick={increaseMonth}
                    width={20}
                    height={20}
                    style={
                      nexMonthButtonDisabled
                        ? { visibility: "hidden", marginTop: "4px" }
                        : { display: "block", marginTop: "4px" }
                    }
                  />
                </div>
              )}
            />
            <label htmlFor="startDate" className="startDate_label">
              <span>
                &nbsp;
                {info.startDate}
              </span>
            </label>
          </form>
        </div>
        <p>~</p>
        <div className="calendar_wrap_2">
          <form autoComplete="off">
            <DatePicker
              className={`endDate ${endDate ? "active" : undefined}`}
              id="endDate"
              autocomplete="off"
              selected={endDate ? endDate : nextDay()}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              // 구분선
              locale="ko"
              showPoperArrow={false}
              fixedHeight
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nexMonthButtonDisabled,
              }) => (
                <div className="date-customheader">
                  <ArrowLeftSvg
                    onClick={decreaseMonth}
                    width={20}
                    height={20}
                    style={
                      prevMonthButtonDisabled
                        ? { visibility: "hidden" }
                        : { display: "block" }
                    }
                  />
                  <div className="custom-month">
                    <span className="month">{months[date.getMonth()]}월,</span>
                    <span className="year"> {date.getFullYear()}</span>
                  </div>
                  <ArrowRightSvg
                    onClick={increaseMonth}
                    width={20}
                    height={20}
                    style={
                      nexMonthButtonDisabled
                        ? { visibility: "hidden", marginTop: "4px" }
                        : { display: "block", marginTop: "4px" }
                    }
                  />
                </div>
              )}
            />
            <label htmlFor="endDate" className="endDate_label">
              <span>
                &nbsp;
                {info.endDate}
              </span>
            </label>
          </form>
        </div>
      </InputDateStyle>
    );
  }

  return (
    <DateStyle>
    	...v1 생략
    </DateStyle>
  );
};

export default CalendarPop;
