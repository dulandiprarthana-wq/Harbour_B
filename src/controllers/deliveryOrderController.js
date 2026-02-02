// backend/controllers/deliveryOrderController.js
import DeliveryOrder from '../models/DeliveryOrder.js';

export const createDeliveryOrder = async (req, res) => {
  try {
    const doData = req.body;

    const deliveryOrder = await DeliveryOrder.create(doData);

    res.status(201).json({
      success: true,
      data: deliveryOrder,
      message: 'Delivery Order created successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getDeliveryOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deliveryOrder = await DeliveryOrder.findById(id)
      .populate('jobId')
      .populate('portOfLoadingId')
      .populate('originAgentId')
      .populate('carrierId')
      .populate('consigneeId')
      .populate('shipperId')
      .populate('notifyPartyId')
      .populate('salesmanId');

    if (!deliveryOrder) return res.status(404).json({ success: false, message: 'Not found' });

    res.json({ success: true, data: deliveryOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllDeliveryOrders = async (req, res) => {
  try {
    const dos = await DeliveryOrder.find().sort({ createdAt: -1 });
    res.json({ success: true, data: dos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};