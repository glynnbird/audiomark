export default function () {
  const queue = useState('queue',  () => { return [] })

  // function called to show an alert. It adds an 'alert' object to the queue.
  function showAlert(message, colour='primary') {
    if (message) {
      queue.value.push({
        text: message,
        color: colour
      })
    }
  }

  // return the alert queue and the showAlert function
  return { queue, showAlert }
}
