const conns = []

module.exports = ws => {
  ws.on('connection', conn => {
    conn.on('message', msg => {
      try {
        const data = JSON.parse(msg)
        if (data.type === 'online' || data.type === 'offline') {
          // conn.send(data.id)
          // console.log(data)
          conns.forEach(con => {
            con.send(msg)
          })
        }
      } catch (err) {

      }
    })

    conns.push(conn)
  })
}
