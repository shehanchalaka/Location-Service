export default function (err, req, res, next) {
  if (err.isJoi) {
    return res.status(422).send({ message: err.message });
  }

  if (typeof err === "object") {
    return res.status(404).send({ message: err.message });
  }

  return res.status(500).send({ message: "Internal Server Error" });
}
