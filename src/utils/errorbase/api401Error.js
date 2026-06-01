class Api401Error extends Error {
  constructor(message) {
    super(message);
    this.name = "Api401Error";
    this.status = "401";
  }
}

export default Api401Error;
