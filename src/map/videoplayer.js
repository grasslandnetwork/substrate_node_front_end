import React, { useEffect, useState } from 'react'
import { Grid, Modal, Button, Card } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'

function Main(props) {
  const { api } = useSubstrateState()
  const [metadata, setVideoPlayer] = useState({ data: null, version: null })

  useEffect(() => {
    const getVideoPlayer = async () => {
      try {
        const data = await api.rpc.state.getVideoPlayer()
        setVideoPlayer({ data, version: data.version })
      } catch (e) {
        console.error(e)
      }
    }
    getVideoPlayer()
  }, [api.rpc.state])

  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>VideoPlayer</Card.Header>
          <Card.Meta>
            <span>v{metadata.version}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Modal trigger={<Button>Show VideoPlayer</Button>}>
            <Modal.Header>Runtime VideoPlayer</Modal.Header>
            <Modal.Content scrolling>
              <Modal.Description>
                <pre>
                  <code>{JSON.stringify(metadata.data, null, 2)}</code>
                </pre>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default function VideoPlayer(props) {
  const { api } = useSubstrateState()
  return api.rpc && api.rpc.state && api.rpc.state.getVideoPlayer ? (
    <Main {...props} />
  ) : null
}


