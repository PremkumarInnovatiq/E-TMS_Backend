import { createMenuItem, updateMenuItemsByType, getMenuItemsByType, getAllMenuItems } from '../../services/menuItems';

export const createMenuItemController = async (req, res) => {
    const { type, menu_items } = req.body;

    try {
        const menuItem = await createMenuItem(type, menu_items);
        res.status(200).json({ message: 'Menu item created successfully', menuItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMenuItemsByTypeController = async (req, res) => {
    const { type, menu_items } = req.body;

    try {
        await updateMenuItemsByType(type, menu_items);
        const updatedMenuItems = await getMenuItemsByType(type);
        res.status(200).json({
            message: 'Menu items updated successfully',
            data: updatedMenuItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMenuItemsByTypeController = async (req, res) => {
    const { type } = req.params;

    try {
        const menuItems = await getMenuItemsByType(type);
        res.status(200).json({
            message: 'menu items fetched successfully',
            data: menuItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllMenuItemsController = async (req, res) => {
    try {
        const allMenuItems = await getAllMenuItems();
        res.status(200).json(allMenuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
