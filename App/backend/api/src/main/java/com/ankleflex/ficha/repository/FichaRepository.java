package com.ankleflex.ficha.repository;

import com.ankleflex.ficha.entity.Ficha;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FichaRepository extends JpaRepository<Ficha, Long>, JpaSpecificationExecutor<Ficha> {

    @NonNull
    @EntityGraph(attributePaths = {"caracteristica", "identidade", "informacao", "localizacao", "observacao", "produtos", "tipo"})
    Optional<Ficha> findById(@NonNull Long id);

    @NonNull
    @EntityGraph(attributePaths = {"identidade", "produtos"})
    Page<Ficha> findAll(@NonNull Pageable pageable);
}