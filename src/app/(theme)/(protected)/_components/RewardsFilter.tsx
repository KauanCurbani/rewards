"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Stack,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { Search as SearchIcon, FilterList as FilterIcon } from "@mui/icons-material";
import type { SelectChangeEvent } from "@mui/material/Select";

// Tipos para os filtros
export interface FilterState {
  searchTerm: string;
  minPoints: number;
  maxPoints: number;
  category: string;
  sortBy: string;
}

// Tipos para as props
interface RewardsFilterProps {
  maxPoints: number;
  categories: string[];
  onApplyFilters: (filters: FilterState) => void;
}

// Opções de ordenação
const SORT_OPTIONS = [
  { value: "name-asc", label: "Nome (A-Z)" },
  { value: "name-desc", label: "Nome (Z-A)" },
  { value: "points-asc", label: "Pontos (Menor-Maior)" },
  { value: "points-desc", label: "Pontos (Maior-Menor)" },
  { value: "newest", label: "Mais recentes" },
  { value: "popular", label: "Mais populares" },
];

export function RewardsFilter({ maxPoints, categories, onApplyFilters }: RewardsFilterProps) {
  // Estados locais para os filtros
  const [searchValue, setSearchValue] = useState("");
  const [pointsRange, setPointsRange] = useState<number[]>([0, maxPoints]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  // Handlers para mudanças nos filtros
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handlePointsChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number[];
    setPointsRange(value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    const sort = event.target.value;
    setSortBy(sort);
  };

  // Função para aplicar os filtros
  const handleApplyFilters = () => {
    const filters: FilterState = {
      searchTerm: searchValue,
      minPoints: pointsRange[0],
      maxPoints: pointsRange[1],
      category: selectedCategory,
      sortBy: sortBy,
    };
    onApplyFilters(filters);
  };

  // Função para formatar o valor dos pontos no slider
  const valuetext = (value: number) => {
    return `${value} pontos`;
  };

  // Criar opções de categoria dinamicamente
  const categoryOptions = [
    { value: "all", label: "Todas as categorias" },
    ...categories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    })),
  ];

  return (
    <Paper
      elevation={1}
      sx={{
        width: { xs: "100%", sm: 280 },
        marginRight: { sm: 2 },
        marginBottom: { xs: 2, sm: 0 },
        padding: 2,
        height: "fit-content",
        position: { sm: "sticky" },
        top: { sm: 16 },
      }}
    >
      <Stack spacing={3}>
        {/* Cabeçalho */}
        <Box display="flex" alignItems="center" gap={1}>
          <FilterIcon color="primary" />
          <Typography variant="h6" fontWeight="medium">
            Filtros
          </Typography>
        </Box>

        <Divider />

        {/* Campo de busca por nome */}
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="medium" color="text.primary">
            Nome da recompensa
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar por nome..."
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Filtro por categoria */}
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="medium" color="text.primary">
            Categoria
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="category-select-label">Categoria</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                borderRadius: 2,
              }}
            >
              {categoryOptions.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Slider para faixa de pontos */}
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="medium" color="text.primary">
            Faixa de pontos
          </Typography>
          <Box sx={{ px: 1, mt: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="caption" color="text.secondary">
                {pointsRange[0]} pts
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {pointsRange[1]} pts
              </Typography>
            </Box>
            <Slider
              getAriaLabel={() => "Faixa de pontos"}
              value={pointsRange}
              onChange={handlePointsChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={maxPoints}
              marks={[
                { value: 0, label: "0" },
                { value: maxPoints, label: `${maxPoints}` },
              ]}
              sx={{
                "& .MuiSlider-thumb": {
                  height: 20,
                  width: 20,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                  "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                    boxShadow: "inherit",
                  },
                  "&::before": {
                    display: "none",
                  },
                },
                "& .MuiSlider-valueLabel": {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: "unset",
                  padding: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50% 50% 50% 0",
                  backgroundColor: "primary.main",
                  transformOrigin: "bottom left",
                  transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
                  "&::before": { display: "none" },
                  "&.MuiSlider-valueLabelOpen": {
                    transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
                  },
                  "& > *": {
                    transform: "rotate(45deg)",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Select para ordenação */}
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="medium" color="text.primary">
            Ordenar por
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-select-label">Ordenação</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortBy}
              label="Ordenação"
              onChange={handleSortChange}
              sx={{
                borderRadius: 2,
              }}
            >
              {SORT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Botão para aplicar filtros */}
        <Box>
          <Button
            variant="contained"
            fullWidth
            onClick={handleApplyFilters}
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "medium",
              textTransform: "none",
            }}
          >
            Aplicar Filtros
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
