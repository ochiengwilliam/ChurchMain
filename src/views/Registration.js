import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { useRef, useState } from 'react'
import { cilTrash,cilCloudUpload } from '@coreui/icons'
import { Link } from 'react-router-dom'

const Registration = () => {
  const [files, setFiles] = useState(null)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef()

  const handleDragOver = (e) => {
    e.preventDefault()
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setFiles(e.dataTransfer.files)
    console.log(e.dataTransfer.files)
  }

  const handleDelete = (fileobj) => {
    const newfile = Object.values(files).filter((file) => file !== fileobj)
    setFiles(newfile)
    console.log('nameit', newfile)
  }

  const handleUpload = () => {
    setVisible(!visible)

    const formData = new FormData()
    formData.append('Files', files)
    console.log(formData.getAll())

    // fetch(
    //   "link", {
    //     method: "POST",
    //     body: formData
    //   }
    // )

    
    console.log(files)
  }

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          <CCard className="mb-4" style={{ boxShadow: '0px 15px 34px 0px rgba(0,0,0,0.2)' }}>
            <CCardHeader style={{ backgroundColor: '#fff', color:"blue" }}>
              <h3>Upload file</h3>
            </CCardHeader>
            <CCardBody>
              <div
                style={{
                  background: '#f3f4f6',
                  border: '2px dashed lightgray',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: 'gray',
                  padding: '20px',
                  //boxShadow: "inset 0px 0px 60px 0px rgba(0,0,0,0.1)"
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <CIcon icon={cilCloudUpload} size="3xl"/>
                <h3>Drag and Drop files to upload</h3>
                <h3>Or</h3>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  hidden
                  ref={inputRef}
                />

                <CButton
                  type="button"
                  color="dark"
                  id="inputGroupFileAddon04"
                  onClick={() => inputRef.current.click()}
                  style={{ margin: '20px' }}
                >
                  Select Files
                </CButton>
              </div>

              {files && (
                <div style={{ margin: '40px' }}>
                  <CListGroup flush>
                    {Array.from(files).map((file, idx) => (
                      <CListGroupItem
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {file.name}
                        <CButton
                          color="danger"
                          style={{ color: '#fff' }}
                          onClick={() => handleDelete(file)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                  <div style={{ margin: '15px', width: '100%' }} className="d-grid gap-2">
                    <CButton
                      color="success"
                      onClick={handleUpload}
                      style={{ marginRight: '20px', color: '#fff' }}
                      xs={10}
                    >
                      Upload
                    </CButton>
                    {/*<CButton color="secondary" onClick={() => setFiles(null)}>clear All</CButton>*/}
                  </div>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        style={{display:"flex",alignItems:"center", justifyContent:"center"}}  
      >

        <CModalBody style={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center", width:"100%", padding:"50px", textAlign:"center"}}>

            <CModalTitle style={{width:"100%"}}>
              <h2>Uploaded Successfully</h2>
            </CModalTitle>
            <Link to="/members" style={{width:"100%", display:"flex",alignItems:"center", justifyContent:"center"}}>
              <CButton color="primary" className="mt-3" style={{width:"80%"}}> OK </CButton>
            </Link>
            
        </CModalBody>
      </CModal>
    </>
  )
}

export default Registration
