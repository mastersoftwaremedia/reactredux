import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
//import {v4 as uuid} from 'uuid'
//const id = uuid()
import {connect} from 'react-redux'
import {getItems, deleteItem} from '../actions/itemAction'

class ShoppingList extends Component{
	componentDidMount(){
		this.props.getItems()
	}
	onDeleteClick=id=>{
		this.props.deleteItem(id)
	}
	
	render(){
		//const {items}=this.state
		const {items}=this.props.itemList
		return(
			<Container>
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({_id, name})=>(
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
								<Button className="remove-btn" color="danger" size="sm"
									onClick={()=>this.onDeleteClick(_id)}
								>&times;</Button>
								{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		)
	}
}
ShoppingList.propTypes={
	getItems:PropTypes.func.isRequired,
	deleteItem:PropTypes.func.isRequired,
	items:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
	itemList:state.items
})

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList)

