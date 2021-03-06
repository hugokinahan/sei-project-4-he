import React from 'react'
import { Form, Checkbox, Button } from 'semantic-ui-react'
import { useHistory, useParams } from 'react-router-dom'
import Select from 'react-select'


import useForm from '../../utils/useForm'
import { editProperty, getSingleProperty } from '../../lib/api'
import { getUserId } from '../../lib/auth'

function PropertyEdit() {

  const history = useHistory()
  const { id } = useParams()

  const [editErrors, setEditErrors] = React.useState(false)

  const { formdata, setFormdata,  handleChange } = useForm({
    name: '',
    address: '',
    city: '',
    country: '',
    continent: '',
    description: '',
    property_image: '',
    is_available: '',
    latitude: '',
    longitude: '',
    bathrooms: '',
    bedrooms: '',
    types: [],
    owner: ''
  })

  const [property, setProperty] = React.useState([])


  const types = [ 
    { label: 'City', value: 1 },
    { label: 'Countryside', value: 2 },
    { label: 'Beach', value: 3 },
    { label: 'Mansion', value: 4 },
    { label: 'Cosy', value: 5 },
    { label: 'Spacious', value: 6 },
    { label: 'Modern', value: 7 },
    { label: 'Traditional', value: 8 },
    { label: 'Apartment', value: 9 },
    { label: 'Chalet', value: 10 },
    { label: 'Pet-friendly', value: 11 },
    { label: 'Bungalow', value: 12 },
    { label: 'Peaceful', value: 13 },
    { label: 'Lively', value: 14 },
    { label: 'Penthouse', value: 15 }
  ]

  // Fetch Single Property

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleProperty(id)
        setProperty(data)
        console.log(data)
        setFormdata(data)
        console.log(property)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])




  // Edit Property Function

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const newProperty = { ...formdata, is_available: true, owner: getUserId() }
      await editProperty(id, newProperty)
      history.push(`/properties/${id}`)
    } catch (err) {
      setEditErrors(true)
      console.log(err)
    }
  }


  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    handleChange({ target: { name, value: selectedItems } })
  }

  return (
    <div className="edit-container">
      <section className="register-section">
        <h1>Edit Your Property</h1>
        <Form inverted onSubmit={handleSubmit} className="small form">
          <Form.Group widths='equal'>
            <Form.Field>
              <label fluid>Property Name</label>
              <input placeholder='eg. Belmont Estate'
                onChange={handleChange}
                name="name"
                value={formdata.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input placeholder='eg. 138 Belmont Avenue'
                onChange={handleChange}
                name="address"
                value={formdata.address}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>City</label>
              <input placeholder='eg. London'
                onChange={handleChange}
                name="city"
                value={formdata.city}
              />
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <input placeholder='eg. United Kingdom' 
                onChange={handleChange}
                name="country"
                value={formdata.country}
              />
            </Form.Field>
            <Form.Field>
              <label>Continent</label>
              <input placeholder='eg. Europe' 
                onChange={handleChange}
                name="continent"
                value={formdata.continent}
              />
            </Form.Field>
          </Form.Group>
          
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Latitude</label>
              <input placeholder='eg. 51.35645'
                onChange={handleChange}
                name="latitude"
                value={formdata.latitude}
              />
            </Form.Field>
            <Form.Field>
              <label>Longitude</label>
              <input placeholder='eg. -51.35645'
                onChange={handleChange}
                name="longitude"
                value={formdata.longitude}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Bedrooms</label>
              <input placeholder='eg. 5'
                onChange={handleChange}
                name="bedrooms"
                type="number"
                value={formdata.bedrooms}
              />
            </Form.Field>
            <Form.Field>
              <label>Bathrooms</label>
              <input placeholder='eg. 4'
                onChange={handleChange}
                name="bathrooms"
                type="number"
                value={formdata.bathrooms}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Property Image</label>
            <input placeholder='eg. property_image.png'
              onChange={handleChange}
              name="property_image"
              value={formdata.property_image}
            />
          </Form.Field>
          <div className="field">
            <label className="label">Select Relevant Property Types</label>
            <div className="control">
              <Select 
                options={types}
                isMulti // boolean implied to be true without = {}
                name="types"
                onChange={selected => handleMultiSelectChange(selected, 'types')}
              />
            </div>
          </div>
          <Form.Field>
            <label>Description</label>
            <textarea placeholder='eg. Exquisite Custom Gated Contemporary Estate in prime London. Amazing View lot with jetliner views. Over 11,000 sqft of luxury living on ¾ of an acre.' 
              onChange={handleChange}
              name="description"
              value={formdata.description}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Available For Exchange' />
          </Form.Field>
          <Button type='submit'>Edit Property</Button>
        </Form>     
        {editErrors ?
        
          <div className="ui error message small">
            <div className="header">Please ensure each field is completed</div>
          </div>
          :
          ''
        }
      </section>
    </div>
  )
}

export default PropertyEdit