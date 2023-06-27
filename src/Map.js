import { Modal, Button } from 'semantic-ui-react'


export default function Main(props) {  
    return (
        <Modal trigger={<Button>Show Metadata</Button>}>
        <Modal.Header>Runtime Metadata</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <pre>
              <code>It works</code>
            </pre>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
}