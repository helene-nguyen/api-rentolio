const addHours = (numOfHours, date = new Date()) => {
    if (!numOfHours)
        return null;
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
};
export { addHours };
//# sourceMappingURL=addHours.js.map