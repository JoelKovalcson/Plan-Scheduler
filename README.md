# Plan Scheduler

## Description

The foundation for this project was provided by an online bootcamp for [Full-Stack Development](https://bootcamps.vanderbilt.edu/coding/online/landing/). 

You can view the live project [here](https://joelkovalcson.github.io/Plan-Scheduler/).

The purpose of this project was to create a planner for the current day using `jQuery` and `moment.js`.

This planner had a few requirements listed below.
* Displaying the current day at the top of the page.
* A block-oriented structure that contains text input for entering events.
  - These blocks are color coded to indicate past, present, or future.
* When the save button is pressed, `localStorage` is used to preserve the information on page reloads.

## Preview

![Plan Scheduler Preview Image](https://github.com/JoelKovalcson/Plan-Scheduler/blob/main/assets/images/readme-preview.png)

## What I Did

The first step I focused on was creating the time blocks blocks dynamically in javascript so that later on the work day could be adjusted to any number of hours in that day. After that step I focused on loading data from `localStorage` and finished up with some styling touch ups.