import { Modal, Button } from 'semantic-ui-react'
import { App } from './map/App';
 
export default function Main(props) {  
    return (
        <Modal style={{ height: '90%', width: '90%' }} trigger={<Button>Show Map</Button>}>
        <Modal.Header>Runtime Metadata</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <App />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
}