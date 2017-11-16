# Node.JS
This project is for the technical round at ATMAS Softwares

The project provides basic functionality of CRUD(Create, Read, Update, Delete) on the database provided at *https://data.gov.in/catalog/image-intensification-based-devices-drdo.* in form of an **API**.

The project contains 4 methods:

  1. **Create:** This is a POST method that requires user to send 4 parameters *("DEVICE NAME","MAGNIFICATION (X)","FIELD OF                VIEW(degree)","RANGE(m)")* as variables *(deviceName,magnification,fieldOfView,range)* and can be called on **/addnewdevice**.
  2. **Read:** This method is a GET method that sends back all the data to user. This method can be called on **/readalldevices**.
  3. **Update:** This method is a POST method that takes upto 5 parameters *(Device name(deviceNameOld), New Device Name(deviceNameNew),Magnification(magnificationNew),Field of view(fieldOfViewNew),Range(rangeNew)*. Any field value provided with Device name will be updated for that device name. This method can be called on **/updatedevice**.
  4. **Delete:** This method is a POST method that takes the name of the device(deviceName) as input and deletes the entry associated with it. This method can be called on **/deletedevice**.

The server can be started by after installing nodejs and by running the command **node index** in the directory Project.