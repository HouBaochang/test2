/**
 * @file 课程表 - 课程格
 * @desc 用于显示课程的详细信息
 */
import React from 'react';
import { Popover, Icon } from 'antd';
import style from './style.less';

module.exports = props => {
  const courses = props.courses || [];
  const courseArray = new Array(12).fill(0);
  courses.forEach(v => {
    let index = v.time[0][1];
    courseArray[index] = v;
  });
  let flag = -1; // 生成课程表的时候用
  const weekDict = [ '一', '二', '三', '四', '五', '六', '日' ];
  const boxHeight = 30; // 每个单元格的高度
  const week = new Date().getDay() - 1; // 获取今天星期数
  const className = week == props.today ? 'course-day course-today' : 'course-day';
  const today = `星期${weekDict[props.today]}`;

  const EmptyBox = () => {
    let config = {
      style: {
        height: `${boxHeight}px`
      },
      className: 'course-box'
    };
    return <div {...config}></div>;
  };
  const CourseBox = props => {
    const {className} = props;
    const PopoverContent = (
      <div className="popover-content">
        <div className="item">
          <Icon type="book" />
          <span className="content">{props.courseId}</span>
        </div>
        <div className="item">
          <Icon type="user" />
          <span className="content">{props.teacher}</span>
        </div>
        <div className="item">
          <Icon type="calendar" />
          <span className="content">{props.date.join(',')}</span>
        </div>
      </div>
    );
    let popoverConfig = {
      title: props.courseName,
      content: PopoverContent
    };
    let config = {
      style: {
        height: `${boxHeight * props.time.length}px`,
        cursor: 'pointer'
      },
      className: 'course-box ' + className
    };
    const courseName = props.courseName.length > 10
      ? props.courseName.slice(0, 8) + '...'
      : props.courseName;
    return (
      <Popover {...popoverConfig}>
        <div {...config}><div className="course-content">
          <div className="course-name">{courseName}</div>
          <div className="course-room">
            <span className="icon-office"></span>
            <span className="content">{props.room}</span>
          </div>
        </div></div>
      </Popover>
    );
  };
  return <div className={className}>
    <div className="course-week">{today}</div>
    {courseArray.map((v, i) => {
      if(i >= flag) {
        let returnDom = <EmptyBox key={i}></EmptyBox>;
        const classDict = [style.morning, style.afternoon, style.evening];
        if(v != 0) {
          const className = classDict[parseInt(i / 4)];
          returnDom = <CourseBox {...v} key={i} className={className}></CourseBox>;
          flag = i + v.time.length;
        }
        return returnDom;
      }
    })}
  </div>;
};