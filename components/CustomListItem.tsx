// all the text changes from above, with a default ListItemFrame
import { forwardRef } from 'react';
import {
  ListItemFrame,
  ListItemProps,
  ListItemSubtitle,
  ListItemText,
  ListItemTitle,
  styled,
  TamaguiElement,
  themeable,
  useListItem,
} from 'tamagui';
const CustomListItemTitle = styled(ListItemTitle, {
  color: 'black',
});

const CustomListItemSubtitle = styled(ListItemSubtitle, {
  color: '#222',
});

const CustomListItemText = styled(ListItemText, {
  color: 'red',
});

export const ListItem = themeable(
  forwardRef<TamaguiElement, ListItemProps>((propsIn, ref) => {
    const { props } = useListItem(propsIn, {
      Title: CustomListItemTitle,

      Text: CustomListItemText,

      Subtitle: CustomListItemSubtitle,
    });
    return <ListItemFrame {...props} ref={ref} tabIndex={-1} />;
  })
);
