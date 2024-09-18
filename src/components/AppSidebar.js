import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'
import logo1 from 'src/assets/images/logo1.png'
import { CImage } from '@coreui/react'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{
        backgroundColor: 'rgba(22, 89, 177, 0.925)', // Maroon color
        color: 'white',
        boxShadow: '20px 0px 60px -5px rgba(0,0,0,0.2)',
        zIndex: 3,
      }}
    >
      <CSidebarHeader className="border-bottom">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
          <CImage rounded src={logo1} width={50} height={50} />
          <h4>PCEA</h4>
        </div>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      {
        // nav list
      }
      <AppSidebarNav items={navigation} />

      <CSidebarFooter
        className="border-top d-none d-lg-flex"
        style={{ height: '49px' }}
      ></CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
