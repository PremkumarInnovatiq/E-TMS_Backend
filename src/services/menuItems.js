import MenuItems from '../models/menuItems';

export const createMenuItem = async (type, menuItems) => {
    try {
        const existingMenuItem = await MenuItems.findOne({ type });
        if (existingMenuItem) {
            throw new Error('Menu item already exists for this type');
        }
        const menuItem = new MenuItems({
            type,
            menu_items: menuItems
        });
        await menuItem.save();
        return menuItem;
    } catch (error) {
        if (error.message === 'Menu item already exists for this type') {
            throw error;
        } else {
            throw new Error('Failed to create menu item');
        }
    }
};


export const updateMenuItemsByType = async (type, menuItems) => {
    try {
        await MenuItems.findOneAndUpdate({ type }, { menu_items: menuItems });
    } catch (error) {
        throw new Error('Failed to update menu items');
    }
};

export const getMenuItemsByType = async (type) => {
    try {
        const menuItem = await MenuItems.findOne({ type });
        if (!menuItem) {
            throw new Error('Menu items not found');
        }
        return menuItem.menu_items;
    } catch (error) {
        throw new Error('Failed to retrieve menu items');
    }
};

export const getAllMenuItems = async () => {
    try {
        const allMenuItems = await MenuItems.find();
        return allMenuItems;
    } catch (error) {
        throw new Error('Failed to retrieve all menu items');
    }
};