import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';

import { allowedFileTypes } from '../../../../../../shared/utils/values';
import { createTool } from '../../../../../../store/features/tools/slice';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { ToolCategory, ToolRequest } from '../../../../../../shared/types/tools';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const newToolRequest = () => ({
  img: '', url: '', title: '', category: ToolCategory.general, description: ''
});

const Input = styled('input')({display: 'none'});


const CreateTool: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toolsList } = useAppSelector(state => state.tools);

  const image = useRef<File>();
  const [loading, setLoading] = useState(false);
  const [tool, setTool] = useState<ToolRequest>(newToolRequest());


  const handleAddImage = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.target as HTMLInputElement;
    const file = result.files?.[0];

    if (!file) {
      setTool({...tool, img: ''});
      image.current = undefined;
      return;
    }

    image.current = file;
    setTool({...tool, img: file.name});
  };

  const handleRemoveImage = () => {
    image.current = undefined;
    setTool({...tool, img: ''});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    const toolData = new FormData();
    toolData.append('url', tool.url);
    toolData.append('title', tool.title);
    toolData.append('category', tool.category);
    toolData.append('description', tool.description);
    if (image.current) toolData.append('file', image.current);

    try {
      await dispatch(createTool(toolData)).unwrap();

      setOpen(false);
      setTool(newToolRequest());
      toast.success(t('tools.create.success', {tool: tool.title}));
    }
    catch (error: any) {
      toast.error(error);
    }

    setLoading(false);
  };


  return (
    <Dialog
      onSubmit={handleSubmit}
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('tools.create.title')}</DialogTitle>

      <DialogContent>
        <FormControl sx={{mb: 2}}>
          <InputLabel id="tool-select-category">{t('tools.create.category')}</InputLabel>
          <Select
            size="small" value={tool.category}
            labelId="tool-select-category" label={t('tools.create.category')}
            onChange={e => setTool({...tool, category: e.target.value as ToolCategory})}
          >
            {Object.keys(ToolCategory).map(category => (
              <MenuItem value={category}>{t('tools.' + category)}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="MuiDialogContent-row">
          <TextField
            required
            autoFocus
            margin="dense"
            variant="standard"
            name="cb-tool-name"
            value={tool.title ?? ''}
            label={t('tools.create.name')}
            onChange={e => setTool({...tool, title: e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="standard"
            name="cb-tool-url"
            value={tool.url ?? ''}
            label={t('tools.create.url')}
            onChange={e => setTool({...tool, url: e.target.value})}
          />
        </div>

        <TextField
          name="cb-tool-description"
          sx={{mb: 2}} margin="normal"
          required fullWidth multiline
          value={tool.description ?? ''}
          label={t('tools.create.description')}
          onChange={e => setTool({...tool, description: e.target.value})}
        />

        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center'}}>
          <label htmlFor="file-btn">
            <Input
              type="file"
              id="file-btn"
              onInput={handleAddImage}
              accept={allowedFileTypes.tools.join(', ')}
            />
            <Button variant="contained" component="span">
              {t('tools.update.image')}
            </Button>
          </label>

          <IconButton
            sx={{p: '6px'}} color="error"
            disabled={!tool.img} onClick={handleRemoveImage}
          >
            <Close/>
          </IconButton>

          <span className="text-overflow" title={tool.img}>
            {tool.img || t('tools.create.no_image')}
          </span>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" variant="contained" loading={loading}
          disabled={!toolsList || !(tool.title && tool.description && tool.url)}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default CreateTool;
