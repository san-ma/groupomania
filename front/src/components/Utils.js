export const dateParser = (num) => {
    let options = {weekday: "long", year: "numeric", month: "short", day: "numeric"};

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

    return date.toString();
}

//Function that allow to treat the data send by createdAt (timestamp of mongoDB)
  export const timestampParser = (num) => {
    //js note date
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let date = new Date(num).toLocaleDateString("fr-FR", options);
  
    return date.toString();
  }
  
  //IsEmty function to determine if the value is empty or not in function of 4 conditions
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};